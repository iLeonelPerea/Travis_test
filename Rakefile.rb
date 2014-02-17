require "./hamming_test.rb"

task :default => [:test]

task :test do
	test_complete_hamming_distance_of_for_single_nucleotide_strand
end