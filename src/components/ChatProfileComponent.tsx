interface ChatProfileComponentProps {
  data: {
    name: string;
    id: string;
  };
  isCurrent: boolean;
  onClickChangeChatUserProfile: () => void;
}

const ChatProfileComponent = (props: ChatProfileComponentProps) => {
  const { name } = props.data;
  const { onClickChangeChatUserProfile } = props;
  return (
    <button
    style={{
      backgroundColor: props.isCurrent ? "rgb(129 140 248)" : "#fff",
      color: props.isCurrent ? "white" : "black",
    }}
      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-max-12"
      onClick={() => {
        onClickChangeChatUserProfile();
      }}
    >
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {name[0]}
      </div>
      <div className="ml-2 text-sm font-semibold whitespace-nowrap">{name}</div>
    </button>
  );
};

export default ChatProfileComponent;
