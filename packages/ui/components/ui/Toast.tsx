import React, { useEffect, useState } from 'react';
import Alert from './Alert';

interface ToastProps {
    title: string;
    content: string;
    buttonText?: string;
    onButtonClick?: () => void;
    duration?: number;
    variant?: 'violet' | 'green' | 'blue';
}

const Toast: React.FC<ToastProps> = ({ title, content, buttonText, onButtonClick, duration = 5000, variant = 'violet' }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Commented out the audio play code
        // const audio = new Audio('./');
        // audio.play();

        const timeout = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => {
            clearTimeout(timeout);
        };
    }, [duration]);

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Alert
                title={title}
                content={content}
                buttonText={buttonText}
                onButtonClick={onButtonClick}
                variant={variant}
            />
        </div>
    );
};

export default Toast;
