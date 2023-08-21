import { PaginationOrder, PaginationRequestDto, PaginationResponse } from '.';

describe('PaginationRequestDto', () => {
  let paginationRequestDto: PaginationRequestDto<unknown>;

  beforeEach(() => (paginationRequestDto = new PaginationRequestDto()));

  it('should have a default limit of 20', () => expect(paginationRequestDto.limit).toBe(20));

  it('should have a default skip of 0', () => expect(paginationRequestDto.skip).toBe(0));

  it('should have a default order of DESCENDING', () =>
    expect(paginationRequestDto.order).toBe(PaginationOrder.DESCENDING));

  it('should have a default sort of "createdAt"', () =>
    expect(paginationRequestDto.sort).toBe('createdAt'));

  it('should have a text property that is optional and of type string', () => {
    paginationRequestDto.text = 'some text';
    expect(paginationRequestDto.text).toEqual('some text');
  });

  it('should have an order property that is optional and of type PaginationOrder', () => {
    paginationRequestDto.order = PaginationOrder.ASCENDING;
    expect(paginationRequestDto.order).toEqual(PaginationOrder.ASCENDING);
  });

  it('should have a sort property that is optional and can be a key of the generic type T or a string', () => {
    paginationRequestDto.sort = 'some-sort-key';
    expect(paginationRequestDto.sort).toEqual('some-sort-key');
  });
});

describe('PaginationResponse', () => {
  it('should have a count property of type number', () => {
    const paginationResponse: PaginationResponse<unknown> = {
      count: 10,
      items: [],
    };
    expect(paginationResponse.count).toBe(10);
  });

  it('should have an items property that is an array of the generic type T', () => {
    const paginationResponse: PaginationResponse<string> = {
      count: 10,
      items: ['item1', 'item2'],
    };
    expect(paginationResponse.items).toEqual(['item1', 'item2']);
  });
});
