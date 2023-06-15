/// <reference types="Cypress" />

const variables = require('../support/Page_Objects/variables.js')
const TaskPage = require('../support/Page_Objects/task_Page.js')
const element = require('../support/Page_Objects/elementsToLocate.js')

describe('Covering every element with at least 1 test', () => {
	let taskPage
	beforeEach(() => {
		taskPage = new TaskPage()
		taskPage.checkAndSetEnv(element.FILE_HTML, variables.TITLE)
	})

	it('Header section', () => {
		taskPage.checkHeaderStyles()
		taskPage.headerLogoCheck()
		taskPage.headerButtonTextAndHref()
	})

	it('Page title on wrapper', () => {
		taskPage.checkPageTitle()
		taskPage.changePageTitle()
	})

	it('Dropdown menu block', () => {
		taskPage.dropdownTitleCheck()
		taskPage.dropdownOptionsCount()
		taskPage.dropdownSelectOption()
	})

	it('Uploading image block', () => {
		taskPage.imageBlockTitleCheck()
		taskPage.uploadImage()
	})

	it('Open new tab block', () => {
		taskPage.newTabBlockTitle()
		taskPage.stubAndCallTab()
	})

	it('Invoking an alert', () => {
		taskPage.invokeAlertBlockTitle()
		taskPage.readFileInvokeModalStandard()
		taskPage.readFileInvokeModalTrimmed()
	})

	it('Show/hide the input block positive scenario', () => {
		taskPage.showHideBlockTitle()
		taskPage.hideInput()
		taskPage.showInput()
	})

	it('Hover block', () => {
		taskPage.hoverBlockTitle()
		taskPage.hoverTrigger()
		taskPage.hoverStop()
	})

	it('iFrame', () => {
		taskPage.iframeBlockTitle()
		taskPage.aliasIframe()
		taskPage.assertWelcomeText(
			variables.IFRAME_WELCOME_TEXT_PART,
			variables.IFRAME_WELCOME_TEXT_PART2
		)
		taskPage.openMenu()
		taskPage.assertMenu()
	})

	it('Footer section', () => {
		Cypress.on('uncaught:exception', () => {
			return false
		})
		taskPage.checkFooterStyles()
		taskPage.checkFooterSocialsHeader()
		taskPage.openFacebookLink()
	})
})
