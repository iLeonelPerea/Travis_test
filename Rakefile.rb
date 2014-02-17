task :default => [:test]
task :test do
	ruby "hamming_test.rb"
end