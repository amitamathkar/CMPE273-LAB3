package dropbox.dropbox.repository;
import dropbox.dropbox.model.files;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FileRepository extends MongoRepository<files,String> {

    @Query("{parent_id : ?0 }")
    List<files> findAllByParent_id(String parent_id);

    @Query("{shared_with : ?0 }")
    List<files> findAllByShared_with(String shared_with);
}
