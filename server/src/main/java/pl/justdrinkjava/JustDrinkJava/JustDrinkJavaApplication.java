package pl.justdrinkjava.JustDrinkJava;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
@ConfigurationPropertiesScan
@Slf4j
public class JustDrinkJavaApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(JustDrinkJavaApplication.class);
		Environment env = app.run(args).getEnvironment();
		
		logApplicationStartup(env);
	}
	
	private static void logApplicationStartup(Environment env) {
		String protocol = "http";
		if (env.getProperty("server.ssl.key-store") != null) {
			protocol = "https";
		}
		
		String serverPort = env.getProperty("server.port");
		String contextPath = env.getProperty("server.servlet.context-path", "");
		String hostAddress = "localhost";
		
		try {
			hostAddress = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {
			log.warn("The host name could not be determined, using `localhost` as fallback");
		}
		
		log.info("""
			
			----------------------------------------------------------
			Application '{}' is running! Access URLs:
			Local: 		{}://localhost:{}{}
			External: 	{}://{}:{}{}
			Profile(s): 	{}
			----------------------------------------------------------""",
			env.getProperty("spring.application.name", "JustDrinkJava"),
			protocol,
			serverPort,
			contextPath,
			protocol,
			hostAddress,
			serverPort,
			contextPath,
			env.getActiveProfiles()
		);
	}
}
