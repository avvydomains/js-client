import fs from 'fs'
import { cp } from 'fs/promises'
import path from 'path'

const buildBlocklist = async (clientCommonDir) => {
  const blocklist = fs.readFileSync(
    path.join(clientCommonDir, 'blocklist', 'blocklist-hashed.txt'),
    'utf8'
  )
  const items = blocklist.split('\n')
  const fileContent = `
    export default ${JSON.stringify(items)};
  `
  fs.mkdirSync(
    path.join(process.cwd(), 'lib'),
    {recursive: true}
  )
  fs.writeFileSync(
    path.join('lib', 'blocklist.js'), 
    fileContent, 
    'utf8'
  ) 
}

const buildContracts = async (clientCommonDir) => {
  const contractSrcDir = path.join(clientCommonDir, 'contracts')
  const contractDestDir = path.join(process.cwd(), 'lib', 'contracts')
  fs.mkdirSync(
    contractDestDir,
    {recursive: true}
  )
  const files = fs.readdirSync(
    contractSrcDir
  )
  files.forEach(ff => {
    const content = fs.readFileSync(
      path.join(contractSrcDir, ff),
      'utf8',
    )
    const jsContent = 'export default ' + content
    fs.writeFileSync(
      path.join(contractDestDir, ff.replace('.json', '.js')),
      jsContent,
      'utf8'
    )
  })
  const indexContent = `
${files.map(file => `import _${file.replace('.json', '')} from './${file.replace('.json', '.js')}'`).join('\n')}
export default {
  ${files.map(file => `${file.replace('.json', '')}: _${file.replace('.json', '')},
  `).join('')}
}
  `
  fs.writeFileSync(
    path.join('lib', 'contracts', 'index.js'),
    indexContent,
    'utf8'
  )
}

const buildRecords = async (clientCommonDir) => {
  const recordsSrcDir = path.join(clientCommonDir, 'records')
  const recordsDestDir = path.join(process.cwd(), 'lib', 'records')
  fs.mkdirSync(
    recordsDestDir,
    { recursive: true }
  )
  const records = fs.readFileSync(
    path.join(recordsSrcDir, 'records.json'),
    'utf8'
  )
  const output = `
  export default ${records}
  `
  fs.writeFileSync(
    path.join(recordsDestDir, 'records.js'),
    output,
    'utf8'
  )
}

const buildDist = async () => {
  const distDir = path.join(process.cwd(), 'dist')
  fs.mkdirSync(
    distDir,
    { recursive: true }
  )
  await cp(
    path.join(process.cwd(), 'src'),
    path.join(distDir, 'src'),
    { recursive: true }
  )
  await cp(
    path.join(process.cwd(), 'lib'),
    path.join(distDir, 'lib'),
    { recursive: true }
  )
}

const main = async () => {
  let clientCommonDir; 
  let projectCommon = path.join(process.cwd(), 'client-common')
  let isDist = process.argv[2] === 'dist'
  if (isDist) {
    clientCommonDir = projectCommon
  } else {
    clientCommonDir = process.env.AVVY_CLIENT_COMMON || projectCommon
  }
  await buildBlocklist(clientCommonDir)
  await buildContracts(clientCommonDir)
  await buildRecords(clientCommonDir)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
