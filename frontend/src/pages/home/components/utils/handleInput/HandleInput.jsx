// Functions for modal input animation
export const handleInputFocus = (labelId) => {
    const label = document.getElementById(labelId);
    label.classList.add('active');
};

export const handleInputBlur = (labelId) => {
    const label = document.getElementById(labelId);
    const input = document.getElementById(labelId.replace('Label', ''));

    if (input && input.value.trim() !== '') {
        label.classList.add('active');
        return;
    }

    label.classList.remove('active');
};