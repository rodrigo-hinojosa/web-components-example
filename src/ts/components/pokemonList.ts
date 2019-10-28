import { CustomElement } from '@app/decorators';
import { IPokemonPagination, IPokemonPaginationResult } from '@app/models';
import { PokemonPaginationService } from '@app/services';

@CustomElement({
    selector: 'pokemon-list',
    template: `<div class="table-responsive">
                    <table class="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>`,
    style: ``,
    shadowDom: false
})
export class PokemonList extends HTMLElement {
    private pokemonPagination: IPokemonPagination;
    private pokemonPaginationService: PokemonPaginationService = new PokemonPaginationService();
    private tableBody: HTMLTableSectionElement;

    constructor() {
        super();
    }

    connectedCallback(): void {
        try {
            this.getPokemonPaginationFromService();
        } catch(e) {
            console.log('error');
        }
    }

    addEventClick(node: Element, result: IPokemonPaginationResult): void {
        node.querySelector('.cursor').addEventListener('click', () => {
            console.log(1, result);
            console.log(2, this.pokemonPagination);
            result.name = 'wololo';
            console.log(3, this.pokemonPagination);
        });
    }

    protected async getPokemonPaginationFromService(): Promise<void> {
        this.pokemonPagination = await this.pokemonPaginationService.getPokemonPaginationStart().then();
        this.tableBody = this.querySelector('tbody');
        this.pokemonPagination.results.forEach((result, index) => {
            const tableRow: string = `<tr>
                                        <th scope="row">${index + 1}</th>
                                        <td class="text-capitalize">
                                            <span class="cursor">${result.name}</span>
                                        </td>
                                    </tr>`;
            this.tableBody.insertAdjacentHTML('beforeend', tableRow);
            this.addEventClick((this.tableBody.lastChild as Element), result);
        });
    }

    disconnectedCallback(): void {
        console.log('RegionComuna disconnected callback');
    }

    componentWillMount(): void {
        console.log('RegionComuna component will mount');
    }

    componentDidMount(): void {
        console.log('RegionComuna component did mount');
    }

    componentWillUnmount(): void {
        console.log('RegionComuna component will unmount');
    }

    componentDidUnmount(): void {
        console.log('RegionComuna component did unmount');
    }
}
