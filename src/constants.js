export const TEXT = "text";
export const JAVASCRIPT = "javascript";
export const GOLANG = "golang";
export const PYTHON = "python";
export const JAVA11 = "java11";
export const RUBY = "ruby";
export const CPP = "c++";

export const LANGUAGE_VERSIONS = [
  TEXT,
  JAVASCRIPT,
  GOLANG,
  PYTHON,
  JAVA11,
  RUBY,
  CPP,
];

export const COMMENTS = {
  [TEXT]: `Welcome to the code editor! Feel free to select any language of your choice.`,

  // JavaScript Hello World in comments
  [JAVASCRIPT]: `// function greet() {
//  console.log("Hello, world!");
// }
// greet();`,

  // GoLang Hello World in comments
  [GOLANG]: `// import "fmt"
// func greet() {
//  fmt.Println("Hello world!")
// }
// func main() {
//  greet()
// }`,

  // Python Hello World in comments
  [PYTHON]: `# def greet():
#  print("Hello world!")
# greet()`,

  // Java 11 Hello World in comments
  [JAVA11]: `/* 
public class Main {
    public static void main(String[] args) {
        greet();
    }

    public static void greet() {
        System.out.println("Hello, world!");
    }
}
*/`,

  // Ruby Hello World in comments
  [RUBY]: `# def greet
#   puts "Hello, world!"
# end
# greet`,

  // C++ Hello World in comments
  [CPP]: `// #include <iostream>
// using namespace std;
//
// void greet() {
//     cout << "Hello, world!" << endl;
// }
//
// int main() {
//     greet();
//     return 0;
// }`,
};
