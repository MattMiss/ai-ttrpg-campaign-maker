import ModalContainer from "./ModalContainer";

interface DeleteCampaignModalProps {
    campaignTitle: string;
    onDelete: () => void;
    onClose: () => void;
}

const DeleteCampaignModal = ({ campaignTitle, onDelete, onClose }: DeleteCampaignModalProps) => {
    return (
        <ModalContainer onBGClicked={onClose}>
            <div>
                <div className="text-lg">{`Are you sure you want to delete the campaign ${campaignTitle}?`}</div>
                <div className="mt-10 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default DeleteCampaignModal;
