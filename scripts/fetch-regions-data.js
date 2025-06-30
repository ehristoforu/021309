// Получаем данные из CSV файла
async function fetchRegionsData() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/----xKQI1Bar6hP7efZtY6FyCBidrJVODC.csv",
    )
    const csvText = await response.text()

    console.log("CSV данные получены:")
    console.log(csvText)

    // Парсим CSV
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",")

    console.log("\nЗаголовки:", headers)

    const regions = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")

      if (values.length >= 4) {
        const region = {
          name: values[0]?.trim().replace(/"/g, ""),
          population: values[1]?.trim().replace(/"/g, ""),
          providers: values[2]?.trim().replace(/"/g, ""),
          status: values[3]?.trim().replace(/"/g, ""),
        }

        regions.push(region)
      }
    }

    console.log("\nОбработанные регионы:")
    regions.forEach((region, index) => {
      console.log(`${index + 1}. ${region.name} - ${region.population} - ${region.status}`)
    })

    return regions
  } catch (error) {
    console.error("Ошибка при получении данных:", error)
  }
}

// Выполняем функцию
fetchRegionsData()
