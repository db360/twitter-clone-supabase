import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { AuthbuttonServer } from '@/app/components/AuthbuttonServer'
import { redirect } from 'next/navigation'
import { PostList } from './components/PostList'
import { type Database } from './types/databaseTypes'
import { ComposePost } from './components/CompostPost'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  // console.log(session)

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[600px] w-full mx-auto border-l border-r border-white/40 min-h-screen'>
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url}/>
        <PostList posts={posts}/>
      </section>
        <AuthbuttonServer />
    </main>
  )
}
