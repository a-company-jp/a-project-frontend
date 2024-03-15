import { useForm, SubmitHandler } from "react-hook-form";
import { Milestone } from "../../../proto/typescript/pb_out/main";
import { useCallback } from "react";

// とりあえず100年分のカレンダーを表示
const FULL_YEAR = 100;
const START_YEAR = 2022;

type Inputs = {
  title: string;
  content: string;
  beginMonth: string;
  endMonth: string;
};

type Props = {
  lifeEvent: Milestone;
  closeModal: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  handleSaveChange: (newLifeEvent: Milestone) => void;
  deleteLifeEvent: (lifeEventId: string) => void;
};

const EditMilestoneForm = ({
  lifeEvent,
  closeModal,
  handleSaveChange,
  deleteLifeEvent,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      handleSaveChange({
        ...lifeEvent,
        title: data.title,
        content: data.content,
        beginDate: `${data.beginMonth}-01`,
        finishDate: `${data.endMonth}-01`,
      });
      closeModal();
    },
    [lifeEvent, closeModal, handleSaveChange],
  );

  const handleCloseModal = () => {
    lifeEvent.milestoneId === "" && deleteLifeEvent("");
    closeModal();
  };

  const YYYYMMDDToYYYYMM = useCallback((dateString: string): string => {
    const [year, month, _] = dateString.split("-");
    const zeroPaddingYear = `0000${year}`.slice(-4);
    const zeroPaddingMonth = `00${month}`.slice(-2);
    return `${zeroPaddingYear}-${zeroPaddingMonth}`;
  }, []);

  const handleValidateBeginMonth = (data: string) => {
    const startDate = new Date(`${START_YEAR}-01-01`);
    const endDate = new Date(`${START_YEAR + FULL_YEAR}-01-31`);
    const inputDate = new Date(`${data}-01`);
    return inputDate >= startDate && inputDate <= endDate
      ? true
      : "無効な期間です";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="flex gap-4">
          <p>期間</p>
          <strong className={style.inputRequired}>*必須</strong>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="month"
            id="beginMonth"
            title="開始時期"
            {...register("beginMonth", {
              required: "期間の入力は必須です。",
              validate: handleValidateBeginMonth,
            })}
            defaultValue={`${YYYYMMDDToYYYYMM(lifeEvent.beginDate)}`}
            min={`${START_YEAR}-01`}
            max={`${START_YEAR + FULL_YEAR}-03`}
            className={`${style.input.default} ${
              errors.beginMonth && style.input.error
            }`}
            required
          />
          <p>〜</p>
          <input
            type="month"
            id="endMonth"
            title="終了時期"
            {...register("endMonth", {
              required: "期間の入力は必須です。",
              validate: handleValidateBeginMonth,
            })}
            defaultValue={`${YYYYMMDDToYYYYMM(lifeEvent.finishDate)}`}
            min={`${START_YEAR}-01`}
            max={`${START_YEAR + FULL_YEAR}-03`}
            className={`${style.input.default} ${
              errors.endMonth && style.input.error
            }`}
            required
          />
        </div>
        <strong className={style.inputErrorMessage}>
          {errors.beginMonth?.message}
        </strong>
      </div>
      <div className="flex flex-col">
        <label htmlFor="milestoneTitle" className="flex gap-4">
          <p>タイトル</p>
          <strong className={style.inputRequired}>*必須</strong>
        </label>
        <input
          id={"milestoneTitle"}
          defaultValue={lifeEvent.title}
          placeholder="例) マネージャーとしてチームをリードする"
          {...register("title", { required: "タイトルの入力は必須です。" })}
          className={`${style.input.default} ${
            errors.title && style.input.error
          }`}
        />
        <strong className={style.inputErrorMessage}>
          {errors.title?.message}
        </strong>
      </div>
      <div className="flex flex-col">
        <label htmlFor="milestoneContent">内容</label>
        <textarea
          id={"milestoneContent"}
          {...register("content")}
          className={`${style.input.default} h-60`}
        >
          {lifeEvent.content}
        </textarea>
      </div>
      <div className="flex gap-4 justify-stretch px-8">
        <button
          onClick={handleCloseModal}
          type="button"
          className={`${style.buttomButton}`}
          title="変更を破棄して編集をキャンセルする"
          aria-label="変更を破棄して編集をキャンセルする"
        >
          キャンセル
        </button>
        <input
          type="submit"
          className={` bg-blue-400 text-white ${style.buttomButton}`}
          value="保存"
          title="変更を保存して編集を終了する"
          aria-label="変更を保存して編集を終了する"
        />
      </div>
    </form>
  );
};

export default EditMilestoneForm;

const style = {
  input: {
    default: "border border-gray-300 p-3 rounded-md",
    error: "border-red-500 border-2",
  },
  inputRequired: "text-red-600",
  inputErrorMessage: "text-red-600",
  buttomButton:
    "flex-1 py-4 px-4 border rounded-full shadow hover:shadow-none hover:opacity-80 cursor-pointer",
};
