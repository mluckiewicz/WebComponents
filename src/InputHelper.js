// Tworzy grupę inputów z etykietą i selektem
export function createInputGroup(labelText, options, onChange) {
    const group = createInputGroupWrapper();
    const label = createInputLabel(labelText);
    const select = createSelectElement(options, onChange);

    group.appendChild(label);
    group.appendChild(select);

    return group;
}

// Tworzy wrapper grupy inputów
function createInputGroupWrapper() {
    const group = document.createElement('div');
    group.classList.add('input-group', 'input-group-sm', 'mb-3');
    return group;
}

// Tworzy etykietę dla grupy inputów
function createInputLabel(labelText) {
    const label = document.createElement('span');
    label.classList.add('input-group-text');
    label.textContent = labelText;
    return label;
}

// Tworzy element select z opcjami
function createSelectElement(options, onChange) {
    const select = document.createElement('select');
    select.classList.add('form-select');

    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        option.value = optionText;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        if (onChange) onChange(e);
    });

    return select;
}

export function createTextInput(placeholder, onInput) {
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.type = 'text';
    input.placeholder = placeholder;

    input.addEventListener('input', (e) => {
        if (onInput) onInput(e);
    });

    return input;
}

export function createDateInput(onInput) {
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.type = 'date';

    input.addEventListener('input', (e) => {
        if (onInput) onInput(e);
    });

    return input;
}

export function createClearButton(label, onClick) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-secondary');
    button.type = 'button';
    button.textContent = label;

    button.addEventListener('click', (e) => {
        if (onClick) onClick(e);
    });

    return button;
}
