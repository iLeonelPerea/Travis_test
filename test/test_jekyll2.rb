require "test/unit"
require "rubygems"
gem "selenium-client"
require "selenium/client"

class test_jekyll2 < Test::Unit::TestCase

  def setup
    @verification_errors = []
    @selenium = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*chrome",
      :url => "http://antonio-cabreraglz.github.io",
      :timeout_in_second => 60

    @selenium.start_new_browser_session
  end
  
  def teardown
    @selenium.close_current_browser_session
    assert_equal [], @verification_errors
  end
  
  def test_test_jekyll2
    @selenium.open "/"
    @selenium.wait_for_page_to_load "60000"
    @selenium.click "link=Welcome to Jekyll!"
    @selenium.wait_for_page_to_load "60000"
  end
end
