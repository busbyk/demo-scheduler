const Provider = require('./provider-model')
const TimeSlot = require('./time-slot-model')

const handleNewAvailability = async (records) => {
  recordObjs = records.map((record) => {
    return {
      provider: record[0],
      date: record[1],
      startTime: record[2],
      endTime: record[3],
    }
  })
  console.log(JSON.stringify(recordObjs))

  const groupedByProvider = recordObjs.reduce((acc, cur) => {
    acc[cur.provider.trim()] = [
      ...(acc[cur.provider] || []),
      {
        date: cur.date,
        startTime: cur.startTime,
        endTime: cur.endTime,
      },
    ]
    console.log(acc)
    return acc
  }, {})

  console.log(groupedByProvider)

  for (let provider in groupedByProvider) {
    const existingProvider = await Provider.findOne({
      name: provider,
    })

    if (!existingProvider) {
      const newProvider = await new Provider({
        name: provider,
      }).save()
      await saveTimeSlotsByProvider(newProvider, groupedByProvider[provider])
    } else {
      await saveTimeSlotsByProvider(
        existingProvider,
        groupedByProvider[provider]
      )
    }
  }
}

const saveTimeSlotsByProvider = async (provider, timeSlots) => {
  await timeSlots.forEach(async (timeSlot) => {
    await new TimeSlot({
      providerId: provider._id,
      ...timeSlot,
    }).save()
  })
}

const getProviderAvailability = async (name) => {
  let payload = {}
  const providers = await Provider.find()
  console.log('providers: ', providers)

  for (const provider of providers) {
    const timeSlots = await TimeSlot.find({providerId: provider._id})
    if (timeSlots) {
      payload[provider.name] = timeSlots
    }
  }

  return payload
}

module.exports = {handleNewAvailability, getProviderAvailability}
