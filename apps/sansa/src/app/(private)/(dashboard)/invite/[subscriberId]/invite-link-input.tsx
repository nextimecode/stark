'use client'

import { useState } from 'react'
import { IconButton } from '@/components/icon-button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { Copy, Link } from 'lucide-react'

interface InviteLinkInputProps {
  inviteLink: string
}

export function InviteLinkInput({ inviteLink }: InviteLinkInputProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  function copyInviteLink() {
    navigator.clipboard.writeText(inviteLink)
    setTooltipVisible(true)
    setTimeout(() => setTooltipVisible(false), 2000)
  }

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField defaultValue={inviteLink} readOnly />

      <div className="relative">
        <IconButton className="-mr-2" onClick={copyInviteLink}>
          <Copy className="size-5" />
        </IconButton>
        {tooltipVisible && (
          <div className="absolute top-0 right-0 -translate-y-full transform rounded bg-gray-700 px-2 py-1 text-xs text-white">
            Copiado!
          </div>
        )}
      </div>
    </InputRoot>
  )
}
