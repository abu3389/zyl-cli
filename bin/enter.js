#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

const cliBinName = Object.keys(require('../package.json').bin)[0]

// 初始化指令基本信息
program
  .name(cliBinName)
  .usage(`<command> [option]`)
  .version(
    `${cliBinName} ${require('../package.json').version}`,
    '-v, --version'
  )

// 创建一个指令，用于创建脚手架
program
  .command('create <project-name>') // 增加创建指令
  .description('create a new project') // 添加描述信息
  .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    // 引入 create 模块，并传入参数
    require('../lib/create')(projectName, cmd)
  })

// 创建一个指令，用于配置config
program
  .command('config [value]') // config 命令
  .description('inspect and modify the config')
  .option('-g, --get <key>', 'get value by key')
  .option('-s, --set <key> <value>', 'set option[key] is value')
  .option('-d, --delete <key>', 'delete option by key')
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys)
  })

// 监听用户输入help指令 增加logo字体和有颜色的文字提示
program.on('--help', function () {
  console.log(
    '\r\n' +
      figlet.textSync(cliBinName, {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true,
      })
  )
  // 前后两个空行调整格式，更舒适
  console.log()
  console.log(
    `Run ${chalk.cyan(
      cliBinName + ' <command> --help'
    )} for detailed usage of given command.`
  )
  console.log()
})

// 将用户输入指令传递给内部执行
program.parse(process.argv)
