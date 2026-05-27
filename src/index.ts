class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];
  private filteredMotorcycles: Motorcycle[] = [];
  private nameFilter: string = '';

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadMotorcycles();
    this.setupEventListeners();
    this.render();
  }

  private async loadMotorcycles(): Promise<void> {
    this.showLoading(true);
    try {
      const data = await fetchMotorcycles();
      this.allMotorcycles = [...data];
      this.applyFilters();
    } catch (error) {
      console.error('Error loading motorcycles:', error);
    } finally {
      this.showLoading(false);
    }
  }

  private applyFilters(): void {
    this.filteredMotorcycles = this.allMotorcycles.filter((motorcycle) => {
      const matchesName = this.nameFilter === '' || 
        motorcycle.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      return matchesName;
    });
    this.render();
  }

  private setupEventListeners(): void {
    const nameFilterInput = document.getElementById('name-filter-input') as HTMLInputElement;
    if (nameFilterInput) {
      nameFilterInput.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.nameFilter = target.value;
        this.applyFilters();
      });
    }
  }
 
  private render(): void {
    this.renderResultsCount();
    this.renderMotorcycles();
  }

  private renderResultsCount(): void {
    const resultsNumber = document.getElementById('results-number');
    if (resultsNumber) {
      resultsNumber.textContent = this.filteredMotorcycles.length.toString();
    }
  }

  private renderMotorcycles(): void {
    const container = document.getElementById('motorcycle-grid');
    const noResults = document.getElementById('no-results');
    if (!container) return;
    if (this.filteredMotorcycles.length === 0) {
      container.style.display = 'none';
      if (noResults) {
        noResults.style.display = 'block';
      }
      return;
    }
    if (noResults) {
      noResults.style.display = 'none';
    }
    container.style.display = 'grid';
    container.innerHTML = this.filteredMotorcycles
      .map((motorcycle) => renderMotorcycleCard(motorcycle))
      .join('');
  }

  private showLoading(show: boolean): void {
    const loadingContainer = document.getElementById('loading-container');
    const motorcycleGrid = document.getElementById('motorcycle-grid');
    if (loadingContainer) {
      loadingContainer.style.display = show ? 'flex' : 'none';
    }
    if (motorcycleGrid) {
      motorcycleGrid.style.display = show ? 'none' : 'grid';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MotorcycleGalleryApp();
});
