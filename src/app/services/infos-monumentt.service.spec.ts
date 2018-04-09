import { TestBed, inject } from '@angular/core/testing';

import { InfosMonumenttService } from './infos-monumentt.service';

describe('InfosMonumenttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfosMonumenttService]
    });
  });

  it('should be created', inject([InfosMonumenttService], (service: InfosMonumenttService) => {
    expect(service).toBeTruthy();
  }));
});
