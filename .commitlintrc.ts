import type { UserConfig } from '@commitlint/types'

export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'enhance',
        'workflow',
        'types',
        'release'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'deps',
        'config',
        'ui',
        'api',
        'database',
        'model',
        'controller',
        'view',
        'route',
        'test'
      ]
    ]
  },
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit'
    },
    questions: {
      type: {
        description: 'Select the type of change that you\'re committing:',
        enum: {
          enhance: {
            description: 'A feat enhance',
            title: '',
            emoji: '🔍'
          },
          workflow: {
            description: 'Add or Change workflow',
            title: '',
            emoji: '🔄'
          },
          types: {
            description: 'Types changes',
            title: '',
            emoji: '🗂️'
          },
          release: {
            description: 'A version release',
            title: '',
            emoji: '🚀'
          },
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠'
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: 'Other changes that don\'t modify src or test files',
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑'
          }
        }
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
        enum: {
          deps: {
            description:
              'Package management changes, such as adding, updating, or removing dependencies',
            title: 'Dependencies'
          },
          config: {
            description:
              'Configuration file changes, such as adding, updating, or removing configuration options',
            title: 'Config'
          },
          ui: {
            description:
              'User interface changes, such as layout, style, or interaction modifications',
            title: 'UI'
          },
          api: {
            description:
              'API interface changes, such as adding, modifying, or removing API endpoints',
            title: 'API'
          },
          database: {
            description:
              'Database changes, such as adding, modifying, or removing tables, fields, or indexes',
            title: 'Database'
          },
          model: {
            description:
              'Data model changes, such as adding, modifying, or removing data models',
            title: 'Model'
          },
          controller: {
            description:
              'Controller changes, such as adding, modifying, or removing controllers',
            title: 'Controller'
          },
          view: {
            description:
              'View changes, such as adding, modifying, or removing views',
            title: 'View'
          },
          route: {
            description:
              'Route changes, such as adding, modifying, or removing routes',
            title: 'Route'
          },
          test: {
            description:
              'Test changes, such as adding, modifying, or removing test cases',
            title: 'Test'
          }
        }
      },
      subject: {
        description: 'Write a short, imperative tense description of the change'
      },
      body: {
        description: 'Provide a longer description of the change'
      },
      isBreaking: {
        description: 'Are there any breaking changes?'
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
      },
      breaking: {
        description: 'Describe the breaking changes'
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?'
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)'
      }
    }
  }
} satisfies UserConfig
