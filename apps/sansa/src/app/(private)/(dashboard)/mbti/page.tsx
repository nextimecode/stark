import { Suspense } from 'react'
import { AddMBTI } from './add-mbti'
import { MyMBTI } from './my-mbti'

export default function Page() {
  return (
    <div>
      <h1>MBTI</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <MyMBTI />
      </Suspense>
      <AddMBTI />
    </div>
  )
}
