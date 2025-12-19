export type SecretEntry = {
  label: string
  value: string
  hint?: string
}

export type SecretSection = {
  title: string
  description?: string
  entries: SecretEntry[]
  note?: string
}

export type PrivatePayload = {
  hero: {
    emoji: string
    kicker: string
    title: string
    body: string
    note?: string
  }
  sections: SecretSection[]
  meta: {
    owner: string
    lastUpdated: string
    sensitivity: 'internal' | 'confidential' | 'restricted'
  }
}

export const privatePayload: PrivatePayload = {
  hero: {
    emoji: '🌌',
    kicker: 'Trusted Circle Access',
    title: '秘密小花园',
    body: '这里是一些只与少数朋友共享的工具、链接和研究笔记。',
  },
  sections: [
    {
      title: 'LinuxDo邀请链接分享',
      description: 'LinuxDo网站三级用户邀请链接',
      entries: [
        {
          label: '邀请链接(2025.12.19更新)',
          value: 'https://linux.do/invites/2re735Z77j |（已使用）',
          hint: '复制粘贴即可开始注册，需要自己写小作文哦~'
        }
      ],
      note: '<a href="/buy-me-a-cup-of-coffee">Buy me a cup of coffee</a> if this is helpful to you.'
    },
    {
      title: 'Google BookMarks',
      description: '谷歌书签',
      entries: [
        {
          label: '书签',
          value: 'https://drive.google.com/file/d/1Qf03t0M7mzEkNYmMa060DyrpEy9qAzqf/view?usp=drive_link',
          hint: '下载文件导入即可使用'
        }
      ],
      note: '若失效请联系我更新。'
    },
    {
      title: 'TT Mod版FA',
      description: 'Tiktok 安卓魔改版',
      entries: [
        {
          label: '下载地址',
          value: 'https://drive.google.com/file/d/1syOsB0tbGYyjdgE36-22Ny89aR_EC4rS/view?usp=drive_link',
          hint: '下载安装后连接魔法即可使用！'
        }
      ],
      note: '若失效请联系我更新。'
    }
  ],
  meta: {
    owner: 'Junbo',
    lastUpdated: '2025-12-18',
    sensitivity: 'internal'
  }
}
