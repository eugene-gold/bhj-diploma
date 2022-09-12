/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    let select = this.element.querySelector('.accounts-select')
    if (user) {
      Account.list(user, (err, resp) => {
        if (resp && resp.success) {
          resp.data.forEach(acc => {
            select.insertAdjacentHTML('beforeend',
                ` <option value="${acc.id}">${acc.name}</option>`)
          })
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        this.element.reset()
        App.getModal('newIncome').close() || App.getModal('newExpense').close()
        App.update()
      }
    })
  }
}