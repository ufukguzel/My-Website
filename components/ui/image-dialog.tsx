import * as Dialog from '@radix-ui/react-dialog';

interface ImageDialogProps {
    imageUrl: string;
    altText?: string;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({ imageUrl, altText }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <img
                    src={imageUrl}
                    alt={altText || 'Image'}
                    className="rounded-lg shadow-md max-w-full max-h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg focus:outline-none">
                    <Dialog.Close asChild>
                        <button
                            aria-label="Close"
                            className="absolute right-4 top-4 text-lg font-bold text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
                        >
                            ✕
                        </button>
                    </Dialog.Close>
                    <img
                        src={imageUrl}
                        alt={altText || 'Image'}
                        className="rounded-lg object-contain w-full max-h-[90vh]"
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
