require "json"
require "selenium-webdriver"
gem "test-unit"
require "test/unit"

class TestOutletminero < Test::Unit::TestCase

  def setup
    @driver = Selenium::WebDriver.for :phantomjs
    @base_url = "http://outletminero.org/"
    @accept_next_alert = true
    @driver.manage.timeouts.implicit_wait = 30
    @verification_errors = []
  end
  
  def teardown
    @driver.quit
    assert_equal [], @verification_errors
  end
  
  def test_outletminero
    @driver.get(@base_url + "/")
    @driver.find_element(:name, "seccion").click
    Selenium::WebDriver::Support::Select.new(@driver.find_element(:name, "seccion")).select_by(:text, "Noticias")
    @driver.find_element(:css, "option[value=\"2\"]").click
    @driver.find_element(:css, "#frmBuscador > table > tbody > tr > td > #query").click
    @driver.find_element(:css, "#frmBuscador > table > tbody > tr > td > #query").clear
    @driver.find_element(:css, "#frmBuscador > table > tbody > tr > td > #query").send_keys "sustentable"
    # ERROR: Caught exception [Error: Dom locators are not implemented yet!]
    @driver.find_element(:link, "Estratégico el desarrollo de la Minería en Tamaulipas: SE").click
  end
  
  def element_present?(how, what)
    @driver.find_element(how, what)
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end
  
  def alert_present?()
    @driver.switch_to.alert
    true
  rescue Selenium::WebDriver::Error::NoAlertPresentError
    false
  end
  
  def verify(&blk)
    yield
  rescue Test::Unit::AssertionFailedError => ex
    @verification_errors << ex
  end
  
  def close_alert_and_get_its_text(how, what)
    alert = @driver.switch_to().alert()
    alert_text = alert.text
    if (@accept_next_alert) then
      alert.accept()
    else
      alert.dismiss()
    end
    alert_text
  ensure
    @accept_next_alert = true
  end
end
