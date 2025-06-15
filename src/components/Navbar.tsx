// components/Navbar.tsx
export type ViewType = "create" | "view";

interface Props {
    currentView: ViewType;
    onChangeView: (view: ViewType) => void;
}

const Navbar = ({ currentView, onChangeView }: Props) => {
    const isActive = (view: ViewType) =>
        currentView === view
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600";

    return (
        <nav className="fixed w-full bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">🎲 TTRPG Campaign Maker</h1>
            <div className="flex space-x-3">
                <button
                    onClick={() => onChangeView("create")}
                    className={`px-4 py-2 rounded ${isActive("create")}`}
                >
                    Create Campaign
                </button>
                <button
                    onClick={() => onChangeView("view")}
                    className={`px-4 py-2 rounded ${isActive("view")}`}
                >
                    My Campaigns
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
