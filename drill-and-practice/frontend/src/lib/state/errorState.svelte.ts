export type ErrorState = {
    message: string | null;
    visible: boolean;
};

function createErrorState() {
    let message = $state<string | null>(null);
    let visible = $state(false);

    return {
        getMessage: () => message,
        getVisible: () => visible,
        showError: (newMessage: string) => {
            message = newMessage;
            visible = true;
            setTimeout(() => {
                visible = false;
                message = null;
            }, 5000);
        }
    };
}

export const errorState = createErrorState(); 