export default function Button({ children, icon: Icon }) {
    return (
        <button className="p-0 aspect-square h-8 border-white/20 rounded border bg-gray flex items-center justify-center">
            <Icon className="size-4 fill-white/85 hover:fill-white" />
            {children}
        </button>
    );
}
