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

      <InputField readOnly defaultValue={inviteLink} />

      <div className="relative">
        <IconButton className="-mr-2" onClick={copyInviteLink}>
          <Copy className="size-5" />
        </IconButton>
        {tooltipVisible && (
          <div className="absolute top-0 right-0 transform -translate-y-full bg-gray-700 text-white text-xs py-1 px-2 rounded">
            Copiado!
          </div>
        )}
      </div>
    </InputRoot>
  )
}
