import { App } from './App'

const lines: string[] = []

process.stdin.on('data', data => {
  const newLines = data.toString().split('\n')
  lines.push(...newLines)
})

process.stdin.on('end', () => {
  App.run(lines)
})
