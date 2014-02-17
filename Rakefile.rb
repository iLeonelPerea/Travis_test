require_relative "hamming_test.rb"

task :default => [:test]

task :test do
	test_small_hamming_distance
end