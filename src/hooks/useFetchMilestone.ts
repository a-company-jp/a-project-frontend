"use client"

import { Milestone } from "../../proto/typescript/pb_out/main";
import mockMilestones from "@/sample-data/milestones.json";

const useFetchMilestone = () => {

  const getMileStones = async (userId: string): Promise<Milestone[]> => {
    // マイルストーンを取得する関数
    // 指定されたユーザーIDのマイルストーンを全て返す
    const milestones = await mockMilestones.filter((m) => m.userId === userId);
    return milestones
  }
  
  const createMileStone = async (newMileStone: Milestone): Promise<Milestone> => {
    // マイルストーンを新規作成する関数
    // 新しいマイルストーンをサーバーに送信する (milestoneIdは空文字で送信)
    // サーバー側で付与されたmilestoneID または milestone 丸ごとを返す
    const newMileStoneId = await "新しいmilestoneID";
    return {
      ...newMileStone,
      milestoneId : newMileStoneId,
    }
  }
  
  const updateMileStone = async (newMileStone: Milestone): Promise<Milestone> => {
    // マイルストーンを更新する関数
    // 更新したいマイルストーンをサーバーに送信
    // 更新されたマイルストーン または ステータス または void を返す
    await setInterval(()=>{}, 100);
    return newMileStone;
  }
  
  const deleteMileStone = async (milestoneId: string): Promise<void> => {
    // マイルストーンを削除する関数
    // 指定されたmilestoneIdのマイルストーンを削除する
    // ステータス または void を返す
    await setInterval(()=>{ milestoneId }, 100);
  }

  return {getMileStones, createMileStone, updateMileStone, deleteMileStone};
}

export default useFetchMilestone;
