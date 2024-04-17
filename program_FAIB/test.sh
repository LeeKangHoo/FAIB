result_file="testfile.txt"
echo "" > $result_file
save_result_as_json() {
    local analysis_code=$1
    local status=$2

    # JSON 형식으로 결과 생성

    local json="{\n  \"analysis_code\": \"test1\",\n  \"status\": \"warning\"\n}"

    # JSON 결과를 파일에 추가
    echo -e "$json" >> "$result_file"
    echo >> "$result_file"
}
save_result_as_json test1 warning
