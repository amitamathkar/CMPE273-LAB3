package dropbox.dropbox.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document()
public class files {
    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    private String _id;
    private String user_name;
    private String filepath;
    private String filename;
    private String filetype;
    private String starred;
    private String parent_id;
    private String[] shared_with;
    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFiletype() {
        return filetype;
    }

    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }

    public String getStarred() {
        return starred;
    }

    public void setStarred(String starred) {
        this.starred = starred;
    }

    public String getParent_id() {
        return parent_id;
    }

    public void setParent_id(String parent_id) {
        this.parent_id = parent_id;
    }

    public String[] getShared_with() {
        return shared_with;
    }

    public void setShared_with(String[] shared_with) {
        this.shared_with = shared_with;
    }
}
