interface Props {
  onClose: () => void;
  onDelete: () => void;
}

const Toogle = ({ onClose, onDelete }: Props) => {
  return (
    <div className="fixed bg-black/50 w-full h-full left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are you sure you want to delete your OwnStory ?
        </h2>
        <p className="text-sm -mt-6 text-red-500">
          Pressing the delete button will permantly delete you OwnStory post.
        </p>
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={onClose}
            className="py-2 px-6 text-white bg-slate-500 font-bold rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="py-2 px-6 text-white bg-red-500 font-semibold rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toogle;
