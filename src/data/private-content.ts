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
    note: '君子协议 · Gentlemen’s Agreement'
  },
  sections: [
    {
      title: '宝可梦 · 60G/月',
      description: '稳定低延迟线路，适合日常使用。',
      entries: [
        {
          label: '订阅地址',
          value: 'https://pokelink.xn--4gsvmh74cwxi.cn/api/v1/client/subscribe?token=0c166c92d13f6584183e2dc43b28183c',
          hint: '复制到 Clash/V2Ray 中使用'
        }
      ],
      note: '配额每月 1 号重置，若失效请联系我更新。'
    },
    {
      title: '风萧萧公益 · 100G/月',
      description: '公益线路，速度随高峰期变化。',
      entries: [
        {
          label: '订阅地址',
          value: 'https://gucci.weyolo.com/s/1ef4cbe768b7f46ce4486a16ccdcc9cb',
          hint: '包含常见协议，默认 443 端口'
        }
      ],
      note: '仅在私人网络使用，勿公开传播。'
    }
  ],
  meta: {
    owner: 'Junbo',
    lastUpdated: '2024-12-30',
    sensitivity: 'restricted'
  }
}
