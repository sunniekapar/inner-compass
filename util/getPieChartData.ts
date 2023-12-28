export const getPieChartData = (data: number[]) => {
  return data.map((item, index) => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

      return {
          key: index,
          value: item,
          svg: { fill: randomColor },
      }
  })
}