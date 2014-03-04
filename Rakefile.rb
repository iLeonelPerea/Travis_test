require 'w3c_validators'
require 'uglifier'

include W3CValidators

=begin
task :default => [:test]

task :test do
  
end
=end

task :default => [:validate_html, :validate_js, :validate_css, :minify_css]

task :validate_html do
  @validator = MarkupValidator.new

  # turn on debugging messages
  @validator.set_debug!(true)


  Dir.glob("**/*.html").each do |file|
    puts file
    results = @validator.validate_file(file)
    if results.errors.length > 0
      results.errors.each do |err|
      puts err.to_s
    end
    else
      puts 'Valid!'
    end

    puts 'Debugging messages'

    results.debug_messages.each do |key, value|
      puts "#{key}: #{value}"
    end  
  end
end

task :validate_js do
  Dir.glob("**/*.js").each do |f|
    sh "juicer merge -i #{f} --force"
  end
end

task :validate_css do
@validator_css = CSSValidator.new
  Dir.glob("**/*.css").each do |file|
    puts file
    results = @validator_css.validate_file(file)
    if results.errors.length > 0
      results.errors.each do |err|
      puts err.to_s
    end
    else
      puts 'Valid!'
    end

    puts 'Debugging messages'

    results.debug_messages.each do |key, value|
      puts "#{key}: #{value}"
    end
  end
end

task :minify_css do
  Dir.glob("**/*.css").each do |f|
    sh "juicer merge #{f} --force"
  end
end
