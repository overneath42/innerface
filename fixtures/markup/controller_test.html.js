export default function controllerTestFixture() {
  return `
    <div class="test-div">content of div</div>
    <div class="test-div">content of div 2</div>
    <p class="test-p">content of p</p>
    <p class="test-p">content of p 2</p>
    <form class="test-form">
      <input type="hidden" class="test-input" value="value of input:">
    </form>
    <div class="test-data-selector" data-test-selector>content of testSelector</div>
  `;
}
