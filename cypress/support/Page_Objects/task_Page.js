const element = require('./elementsToLocate.js')
const variables = require('./variables.js')
const styles = require('./css_styles.js')

class TaskPage {
	constructor(name) {
		this.name = name
	}

	checkAndSetEnv(...args) {
		const [link, pageTitle] = args
		cy.viewport(1920, 1080)
		cy.visit(link)
		cy.url().should('contain', link)
		cy.title().should('eq', pageTitle)
	}

	headerButtonTextAndHref() {
		return cy
			.get(element.HEADER_HOME_BUTTON)
			.should('contain', variables.HEADER_BTN_HOME_TEXT)
			.parent()
			.should('have.attr', 'href', `${Cypress.env('GotoLink')}/`)
	}

	headerLogoCheck() {
		return cy
			.get(element.HEADER_LOGO)
			.should('have.attr', 'href', `${Cypress.env('GotoLink')}/`)
	}

	checkHeaderStyles() {
		return cy
			.get(element.HEADER)
			.should('have.attr', 'style')
			.and('include', styles.blueBackground)
			.and('include', styles.alignCenter)
	}

	checkPageTitle() {
		return cy
			.get(element.ONPAGE_TITLE)
			.should('have.text', variables.TITLE)
			.and('have.css', styles.fontSize, styles.size40px)
	}

	changePageTitle() {
		return cy
			.get(element.ONPAGE_TITLE)
			.invoke('text', variables.NEW_TITLE)
			.should('have.text', variables.NEW_TITLE)
	}

	dropdownTitleCheck() {
		return cy
			.get(element.DROPDOWN_TITLE)
			.should('have.text', variables.DROPDOWN_TEXT)
			.and('have.css', styles.fontSize, styles.size24px)
	}

	dropdownOptionsCount() {
		return cy.get(element.DROPDOWN_OPTIONS).should((options) => {
			expect(options).to.have.length(3)
		})
	}

	dropdownSelectOption() {
		return cy
			.get(element.DROPDOWN_CONTAINER)
			.select(element.DROPDOWN_OPTION_TO_SELECT)
			.should('have.value', styles.option_value)
	}

	imageBlockTitleCheck() {
		return cy
			.get(element.IMAGE_BLOCK_TITLE)
			.should('have.text', variables.IMAGE_BLOCK_TITLE)
	}

	uploadImage() {
		return cy.get(element.PAGE_WRAPPER).within((wrapper) => {
			if (wrapper.find(element.IMAGES).length === 0) {
				cy.get(element.UPLOAD_IMAGE_INPUT)
					.should('be.visible')
					.selectFile('cypress/fixtures/Very_Black_screen.jpg')
				cy.get(element.IMAGES)
					.should('exist')
					.and((img) => {
						expect(img).to.have.length(1)
					})
			}
		})
	}

	newTabBlockTitle() {
		return cy
			.get(element.OPEN_NEW_TAB_TITLE)
			.should('have.text', variables.OPEN_TAB_BLOCK_TITLE)
	}

	stubAndCallTab() {
		cy.window().then((window) => {
			cy.stub(window, 'open').as('windowStub')
			window.openTab = function () {
				window.open(Cypress.env('GotoLink'), '_self')
			}
		})
		cy.get(element.OPEN_TAB_BUTTON).click()
		cy.get('@windowStub').should(
			'be.calledWith',
			Cypress.env('GotoLink'),
			'_self'
		)
	}

	invokeAlertBlockTitle() {
		return cy
			.get(element.ALERT_BLOCK_TITLE)
			.should('contain', variables.ALERT_INVOKATION_TITLE)
	}

	readFileInvokeModalStandard() {
		cy.task('readFile', 'alert-text.txt').then(($text) => {
			const text = $text.trim()
			cy.on('window:alert', (alertText) => {
				expect(alertText).to.contain(text)
			})
			cy.get(element.ALERT_INPUT).type(text)
			cy.get(element.ALERT_BUTTON).click()
		})
	}

	readFileInvokeModalTrimmed() {
		cy.task('readFile', 'alert-text.txt').then(($text) => {
			const withNoHello = $text.trim().split(' ')
			withNoHello.shift()
			const text = withNoHello.join(' ')
			cy.on('window:confirm', (alertText) => {
				expect(alertText).to.contain(text)
			})
			cy.get(element.ALERT_INPUT).type(text)
			cy.get(element.CONFIRM_BUTTON).click()
		})
	}

	showHideBlockTitle() {
		return cy
			.get(element.HIDE_SHOW_TITLE)
			.should('have.text', variables.SHOW_HIDE_INPUT_TITLE)
	}

	hideInput() {
		return cy.get(element.HIDE_SHOW_BLOCK).within((block) => {
			cy.get(element.HIDE_BUTTON).click()
			cy.get(element.HIDE_SHOW_INPUT).should('not.be.visible')
		})
	}

	showInput() {
		return cy.get(element.HIDE_SHOW_BLOCK).within((block) => {
			cy.get(element.SHOW_BUTTON).click()
			cy.get(element.HIDE_SHOW_INPUT).should('be.visible')
		})
	}

	hoverBlockTitle() {
		return cy
			.get(element.HOVER_BLOCK_TITLE)
			.should('have.text', variables.HOVER_BLOCK_TITLE_TEXT)
	}

	hoverTrigger() {
		cy.get(element.HOVER_CONTENT).should('not.be.visible')
		cy.get(element.HOVER_CONTAINER).trigger('mouseover')
		cy.get(element.HOVER_CONTENT)
			.should('be.visible')
			.and('have.class', element.HOVERED)
			.within(() => {
				cy.get(element.HOVER_OPTION_TOP).click()
			})
		cy.window().its('scrollY').should('eq', 0)
		cy.url().should('contain', '#top')
	}

	hoverStop() {
		cy.get(element.HOVER_CONTAINER).trigger('mouseleave')
		cy.get(element.HOVER_CONTENT)
			.should('not.be.visible')
			.and('not.have.class', element.HOVERED)
	}

	iframeBlockTitle() {
		return cy
			.get(element.IFRAME_TITLE)
			.should('have.text', variables.IFRAME_BLOCK_TITLE)
	}

	aliasIframe() {
		return cy
			.get(element.IFRAME)
			.scrollIntoView()
			.then(($iframe) => {
				const iframeBody = $iframe.contents().find('body')
				cy.wrap(iframeBody).as('iframe')
			})
	}

	assertWelcomeText(first_part, second_part) {
		cy.get('@iframe')
			.find(element.IFRAME_WELCOME_PART)
			.should('have.text', first_part)
		cy.get('@iframe')
			.find(element.IFRAME_WELCOME_PART2)
			.should('have.text', second_part)
	}

	openMenu() {
		cy.get('@iframe').find(element.IFRAME_MENU).click()
	}

	assertMenu() {
		cy.get('@iframe').find(element.IFRAME_MENU_MODAL).should('be.visible')
		cy.get('@iframe')
			.find(element.IFRAME_MENU_OPTIONS)
			.each((opt) => {
				expect(opt.text()).to.be.oneOf(variables.IFRAME_MENU_OPTIONS_ARR_TEXT)
			})
	}

	checkFooterStyles() {
		cy.get(element.FOOTER)
			.should('have.attr', 'style')
			.and('include', styles.blueBackground)
	}

	checkFooterSocialsHeader() {
		return cy
			.get(element.FOOTER_SOCIALS_HEADER)
			.should('have.text', variables.FOOTER_SOCIALS_HEADER_TEXT)
	}

	openFacebookLink() {
		cy.get(element.SOCIALS_LINKS).each((option) => {
			if (option.text().includes(variables.FOOTER_SOCIAL_MEDIA_FACEBOOK)) {
				cy.wrap(option)
					.invoke('attr', 'href')
					.then((href) => {
						cy.get(option)
							.invoke('removeAttr', 'target')
							.click()
							.then(() => {
								cy.url().should('eq', href)
							})
					})
			}
		})
	}
}

module.exports = TaskPage
