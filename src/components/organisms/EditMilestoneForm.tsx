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
};

const EditMilestoneForm = ({
  lifeEvent,
  closeModal,
  handleSaveChange,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    handleSaveChange({
      ...lifeEvent,
      title: data.title,
      content: data.content,
      beginDate: `${data.beginMonth}-01`,
      finishDate: `${data.endMonth}-01`,
    });
    closeModal();
  }, [lifeEvent, closeModal, handleSaveChange]);

  const YYYYMMDDToYYYYMM = useCallback((dateString: string): string => {
    const [year, month, _] = dateString.split("-");
    const zeroPaddingYear = `0000${year}`.slice(-4);
    const zeroPaddingMonth = `00${month}`.slice(-2);
    return `${zeroPaddingYear}-${zeroPaddingMonth}`;
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="flex gap-4">
        <p>期間</p>
        <strong className={style.inputRequired}>*必須</strong>
      </label>
      <div className="flex items-center gap-3">
        <input
          type="month"
          id="beginMonth"
          title="開始時期"
          {...register("beginMonth", { required: true })}
          defaultValue={`${YYYYMMDDToYYYYMM(lifeEvent.beginDate)}`}
          min={`${START_YEAR}-01`}
          max={`${START_YEAR + FULL_YEAR}-03`}
          className={`${style.input.default} ${errors.beginMonth && style.input.error}`}
          required
        />
        <p>〜</p>
        <input
          type="month"
          id="endMonth"
          title="終了時期"
          {...register("endMonth", { required: true })}
          defaultValue={`${YYYYMMDDToYYYYMM(lifeEvent.finishDate)}`}
          min={`${START_YEAR}-01`}
          max={`${START_YEAR + FULL_YEAR}-03`}
          className={`${style.input.default} ${errors.endMonth && style.input.error}`}
          required
        />
      </div>

      <label htmlFor="milestoneTitle" className="flex gap-4">
        <p>
          タイトル
        </p>
        <strong className={style.inputRequired}>*必須</strong>
      </label>
      <input
        id={"milestoneTitle"}
        defaultValue={lifeEvent.title}
        placeholder="例) マネージャーとしてチームをリードする"
        {...register("title", { required: true })}
        className={`${style.input.default} ${errors.title && style.input.error}`}
      />

      <label htmlFor="milestoneContent">内容</label>
      <textarea
        id={"milestoneContent"}
        {...register("content", { required: true })}
        className={`${style.input.default} h-60`}
      >
        {lifeEvent.content}
      </textarea>
      <input type="submit" />
    </form>
  );
};

export default EditMilestoneForm;

const style = {
  input: {
    default: "border p-3 rounded-md",
    error: "border-red-600"
  },
  inputRequired: "text-red-600",
};
