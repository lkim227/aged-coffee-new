import React from 'react'
import {
  booksAndMediaData,
  calculateChanges,
  calculateAverage,
  dietAndExerciseData,
  MonthData,
  sleepData,
} from './helper'

interface TableProps {
  headers: string[]
  months: MonthData[]
}

const Table: React.FC<TableProps> = ({ headers, months }) => {
  const changes = calculateChanges(months)
  const averageData = calculateAverage(months)
  return (
    <table style={{ textAlign: 'left' }}>
      <thead>
        <tr>
          <th>月份</th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {months.map((month, monthIndex) => (
          <tr key={monthIndex}>
            <td>{month.month}</td>
            {month.data.map((cell, cellIndex) => (
              <td key={cellIndex}>
                {cell}
                {monthIndex > 0 && changes[monthIndex - 1][cellIndex] && (
                  <sup>{changes[monthIndex - 1][cellIndex]}</sup>
                )}
              </td>
            ))}
          </tr>
        ))}
        {averageData && (
          <tr style={{ fontWeight: 'bold' }}>
            <td>平均</td>
            {averageData.map((average, index) => (
              <td key={index}>{average}</td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export const SleepTable2024: React.FC = () => {
  return <Table headers={sleepData.headers} months={sleepData.months} />
}

export const DietAndExerciseTable2024: React.FC = () => {
  return <Table headers={dietAndExerciseData.headers} months={dietAndExerciseData.months} />
}

export const BooksAndMediaTable2024: React.FC = () => {
  return <Table headers={booksAndMediaData.headers} months={booksAndMediaData.months} />
}
