const types = ['feat', 'fix', 'style', 'refactor', 'perf', 'chore'];

module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(feat|fix|style|refactor|perf|chore)(\(.+\))?[:：](?:( \[.+\])? (.{1,100})|( .{1,100}))$/,
            headerCorrespondence: ['type', 'scope', 'ticket', 'subject', 'simpleSubject']
        }
    },
    rules: {
        'header-match-team-pattern': [2, 'always'],
        'type-enum': [2, 'always', types],
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'never'],
        'subject-case': [0],
        'header-max-length': [2, 'always', 100]
    },
    plugins: [
        {
            rules: {
                'header-match-team-pattern': ({ header }) => {
                    const pattern = /^(feat|fix|style|refactor|perf|chore)(\(.+\))?[:：](?:( \[.+\])? (.{1,100})|( .{1,100}))$/;
                    const matches = pattern.test(header);
                    const type = header.split(/[:：]/)[0].split('(')[0];

                    if (!matches || (type !== 'feat' && !header.includes('['))) {
                        return [
                            false,
                            `提交信息格式错误！\n\n` +
                            `正确格式为:\n` +
                            `1. feat 类型: type[(scope)]: subject\n` +
                            `2. 其他类型: type[(scope)]: [ticket] subject\n\n` +
                            `type: ${types.join(', ')}\n` +
                            `scope: 可选，模块名称\n` +
                            `ticket: 除 feat 类型外必填，任务编号\n` +
                            `subject: 必填，变更描述（不超过100字符）\n\n` +
                            `示例：\n` +
                            `feat: 项目初始提交\n` +
                            `feat(user): 添加用户登录功能\n` +
                            `fix: [BUG-456] 修复页面加载异常问题`
                        ];
                    }
                    return [true, 'Commit message 格式正确'];
                }
            }
        }
    ]
}; 