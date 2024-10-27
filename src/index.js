export * as ApplyButtonComponent from './ApplyButtonComponent.js';
export * as DataRangeComponent from './DataRangeComponent.js';
export * as FilterForm from './FilterForm.js';
export * as PersonFieldComponent from './PersonFieldComponent.js'
export * as ClearButtonComponent from './ClearButtonComponent.js'


// Inicjalizacja widoku
function init() {
    const filterForm = document.querySelector('hm-filter-form');

    // Nasłuchuj zdarzenia applyFilter
    filterForm.addEventListener('applyFilter', (event) => {
        const filterData = event.detail;
        console.log('Filter applied:', filterData);
    });

    // Nasłuchuj zdarzenia clearFilter
    filterForm.addEventListener('clearFilter', () => {
        console.log('Filter cleared');
    });
}

// Wywołaj funkcję inicjalizacyjną po załadowaniu dokumentu
document.addEventListener('DOMContentLoaded', init);