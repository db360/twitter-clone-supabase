'use client'

import { ComposePostButton } from './ComposePostButton'
import { addPost } from '../actions/AddPostAction'
import { useRef } from 'react'

export function ComposePost ({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (formData) => {
      await addPost(formData)
      formRef.current?.reset()
    }} className='flex flex-row p-3 border-b border-white/20'>
      <img alt='Avatar Image' className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} />
      <div className='flex flex-1 flex-col gap-y-4'>
      <textarea
        name='content'
        rows={4}
        className='w-full text-xl bg-black placeholder-gray-500 p-2'
        placeholder='¡¿Qué está pasando!?'
      ></textarea>
        <ComposePostButton />
      </div>
    </form>
  )
}
