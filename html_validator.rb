require 'w3c_validators'
require 'uglifier'

include W3CValidators
#Validate HTML
=begin
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
=end
=begin
#Validate CSS
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
=end
#minify Javascript
=begin
Dir.glob("assets/js/**/*.js").each do |f|
  puts f  
  unless f.include? "min" then 
    File.open(f.slice(0,f.length - 3) + ".min" + f[-3 ,3], "w") do |file| 
      puts f.slice(0,f.length - 3) + ".min" + f[-3 ,3]
      file.write Uglifier.compile(File.read(f))
    end
  end
end
=end