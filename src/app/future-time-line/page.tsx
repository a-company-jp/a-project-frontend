'use client'
import React from 'react'
import milestones from '@/sample-data/milestones.json'
import FutureTimeLine from '@/components/organisms/FutureTimeLine'

export type MileStone = {
    userId: string;
    milestoneId: string;
    title: string;
    content: string;
    /** GCS内のファイル名 */
    imageHash: string;
    /** RFC3339 */
    beginDate: string;
    /** RFC3339 */
    finishDate: string;
  }

const FutureTimeLinePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
        <FutureTimeLine milestones={milestones} />
    </main>
  )
}

export default FutureTimeLinePage
