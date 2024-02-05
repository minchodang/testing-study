beforeEach(() => {
  cy.visit('/login');
  cy.findByLabelText('로그인').as('loginBtn');
});

it('이메일을 입력하지 않고 로그인 버튼을 클릭할 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByLabelText('로그인').click();
  cy.get('@loginBtn').should('exist');
});

it('비밀번호를 입력하지 않고 로그인 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByLabelText('로그인').click();
  cy.get('@loginBtn').should('exist');
});

it('잘못된 양식의 이메일을 입력한 뒤 로그인 버튼을 클릭할 경우 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
  cy.findByLabelText('이메일').type('wrongemail#email.com');
  cy.findByLabelText('로그인').click();
  cy.findByText('이메일 양식이 올바르지 않습니다').should('exist');
});

it('회원 가입 클릭 시 회원 가입 페이지로 이동한다', () => {
  cy.findByText('회원가입').click();
  cy.url().should('eq', `${Cypress.env('baseUrl')}/register`);
});

it('성공적으로 로그인 되었을 경우 메인 홈 페이지로 이동하며, 사용자 이름 "Maria"와 장바구니 아이콘이 노출된다', () => {
  const username = 'maria@mail.com';
  const password = '12345';

  cy.findAllByLabelText('이메일').type(username);
  cy.findAllByLabelText('비밀번호').type(password);
  cy.findAllByLabelText('로그인').click();
  cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
  cy.findByText('Maria').should('exist');
  cy.findByTestId('cart-icon').should('exist');
});
