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
    title: 'Secret Garden',
    body: 'Hand-curated tools, links, and research notes meant only for close collaborators. Please do not redistribute.',
  },
  sections: [
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
          value: '先欠着',
          hint: '下载安装后连接魔法即可使用！'
        }
      ],
      note: '若失效请联系我更新。'
    }
  ],
  meta: {
    owner: 'Junbo',
    lastUpdated: '2025-11-20',
    sensitivity: 'internal'
  }
}
